"""Build the ATS-friendly PDF and editable Markdown from the portfolio profile.

Run: python3 scripts/build_resume.py (requires reportlab and fonttools).
The built PDF is checked into public; Netlify does not need Python.
"""
import json
from io import BytesIO
from html import escape
from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether, HRFlowable
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from fontTools.ttLib import TTFont as SourceFont

ROOT = Path(__file__).resolve().parents[1]
profile = json.loads((ROOT / "src/data/profile.json").read_text())
output = ROOT / "public/shubham-raj-resume.pdf"
INK = colors.HexColor("#18211C")
MUTED = colors.HexColor("#536057")
ACCENT = colors.HexColor("#426A31")

# Embed the same licensed typeface as the site, avoiding PDF-reader substitution.
for family, filename in [("DMResume", "dm-sans-regular"), ("DMResumeBold", "dm-sans-bold")]:
    font = SourceFont(ROOT / "public/fonts" / (filename + ".woff"))
    font.flavor = None
    data = BytesIO()
    font.save(data)
    data.seek(0)
    pdfmetrics.registerFont(TTFont(family, data))
pdfmetrics.registerFontFamily("DMResume", normal="DMResume", bold="DMResumeBold", italic="DMResume", boldItalic="DMResumeBold")

styles = {
    "name": ParagraphStyle("Name", fontName="DMResumeBold", fontSize=30, leading=34, textColor=INK, spaceAfter=4),
    "title": ParagraphStyle("Title", fontName="DMResume", fontSize=13, leading=18, textColor=ACCENT, spaceAfter=8),
    "contact": ParagraphStyle("Contact", fontName="DMResume", fontSize=9, leading=14, textColor=MUTED),
    "section": ParagraphStyle("Section", fontName="DMResumeBold", fontSize=9.5, leading=14, textColor=ACCENT, spaceBefore=15, spaceAfter=9, tracking=1),
    "role": ParagraphStyle("Role", fontName="DMResumeBold", fontSize=11.5, leading=16, textColor=INK, spaceAfter=3),
    "meta": ParagraphStyle("Meta", fontName="DMResume", fontSize=9, leading=13, textColor=MUTED, spaceAfter=6),
    "body": ParagraphStyle("Body", fontName="DMResume", fontSize=9.5, leading=14.2, textColor=INK, spaceAfter=7, alignment=TA_LEFT),
    "bullet": ParagraphStyle("Bullet", fontName="DMResume", fontSize=9.5, leading=14.2, textColor=INK, leftIndent=10, firstLineIndent=-10, spaceAfter=5),
    "small": ParagraphStyle("Small", fontName="DMResume", fontSize=9, leading=13.5, textColor=INK, spaceAfter=7),
}

def paragraph(text, style="body"):
    return Paragraph(escape(text), styles[style])

def heading(title):
    return paragraph(title.upper(), "section")

def role_blocks(role):
    title = paragraph(f"{role['company']} | {role['title']}", "role")
    meta = paragraph(f"{role['dates']} | {role['location']}", "meta")
    clients = paragraph(f"Engagements: {role['clients']}", "meta")
    bullets = [paragraph("- " + point, "bullet") for point in role["bullets"]]
    return [KeepTogether([title, meta, clients, bullets[0]]), *bullets[1:], Spacer(1, 7)]

def footer(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setStrokeColor(colors.HexColor("#DCE3D8"))
    canvas.line(19 * mm, 16 * mm, width - 19 * mm, 16 * mm)
    canvas.setFont("DMResume", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(19 * mm, 11 * mm, "SHUBHAM RAJ  |  SENIOR FRONTEND ENGINEER")
    canvas.drawRightString(width - 19 * mm, 11 * mm, f"{doc.page} / 2")
    canvas.restoreState()

story = [paragraph(profile["name"].upper(), "name"), paragraph(profile["headline"], "title")]
story.append(paragraph(f"{profile['location']} | {profile['phone']} | {profile['email']}", "contact"))
story.append(Paragraph('<link href="https://shubhamraj.dev" color="#426A31">shubhamraj.dev</link>  |  <link href="https://www.linkedin.com/in/shubham14p3/" color="#426A31">linkedin.com/in/shubham14p3</link>  |  <link href="https://github.com/shubham14p3" color="#426A31">github.com/shubham14p3</link>', styles["contact"]))
story.extend([Spacer(1, 13), HRFlowable(width="100%", thickness=1, color=colors.HexColor("#B0C399")), heading("Profile"), paragraph(profile["summary"]), heading("Core expertise")])
for group in profile["skillGroups"]:
    story.append(Paragraph(f"<b>{escape(group['title'])}:</b> {escape(', '.join(group['items']))}", styles["small"]))
story.append(heading("Professional experience"))
story.extend(role_blocks(profile["roles"][0]))
story.append(PageBreak())
story.extend([paragraph("SHUBHAM RAJ", "role"), paragraph("Professional experience, continued", "meta"), Spacer(1, 8)])
for role in profile["roles"][1:]:
    story.extend(role_blocks(role))
story.append(heading("Education"))
for item in profile["education"]:
    text = f"<b>{escape(item['degree'])}</b><br/>{escape(item['school'])}"
    if item.get("dates"):
        text += f" | {escape(item['dates'])}"
    story.append(Paragraph(text, styles["body"]))
story.append(heading("Selected certifications & professional development"))
for item in profile["certifications"][:3]:
    story.append(paragraph(f"{item['name']} | {item['issuer']} | {item['date']}", "small"))

doc = SimpleDocTemplate(str(output), pagesize=A4, leftMargin=19*mm, rightMargin=19*mm, topMargin=17*mm, bottomMargin=23*mm, title="Shubham Raj - Senior Frontend Engineer", author="Shubham Raj", subject="Professional resume", pageCompression=1)
doc.build(story, onFirstPage=footer, onLaterPages=footer)
copyfile(output, ROOT / "src/assets/resume/resume.pdf")

markdown = [f"# {profile['name']}", f"**{profile['headline']}**", f"{profile['location']} | {profile['phone']} | {profile['email']}", f"[Portfolio]({profile['website']}) · [LinkedIn]({profile['linkedin']}) · [GitHub]({profile['github']})", "## Profile", profile["summary"], "## Skills"]
for group in profile["skillGroups"]:
    markdown.append(f"- **{group['title']}:** {', '.join(group['items'])}")
markdown.append("## Professional experience")
for role in profile["roles"]:
    markdown.extend([f"### {role['company']} — {role['title']}", f"{role['dates']} | {role['location']}", f"Engagements: {role['clients']}", "\n".join(f"- {item}" for item in role["bullets"])])
markdown.append("## Education")
for item in profile["education"]:
    markdown.append(f"- **{item['degree']}**, {item['school']}" + (f" | {item['dates']}" if item.get("dates") else ""))
markdown.append("## Certifications & continuous learning")
for item in profile["certifications"]:
    markdown.append(f"- {item['name']} — {item['issuer']}, {item['date']} ({item['type']})")
(ROOT / "docs").mkdir(exist_ok=True)
(ROOT / "docs/Shubham-Raj-Resume.md").write_text("\n\n".join(markdown) + "\n")
print(f"Generated {output.relative_to(ROOT)} and docs/Shubham-Raj-Resume.md")
