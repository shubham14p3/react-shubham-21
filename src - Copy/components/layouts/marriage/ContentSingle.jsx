import React from 'react';

const ProfileDetails = () => {
    return (
        <div style={styles.container}>
            <section style={styles.sectionHeader}>
                <h1 style={styles.title}>Personal Details</h1>
            </section>

            {/* Personal Details */}
            <section style={styles.section}>
                <h2 style={styles.subtitle}>Personal Information</h2>
                <div style={styles.detailsGrid}>
                    {renderDetail("Name", "SHUBHAM RAJ")}
                    {renderDetail("Date of Birth", "19-08-1994")}
                    {renderDetail("Time of Birth", "11:06 PM")}
                    {renderDetail("Place of Birth", "Jamshedpur")}
                    {renderDetail("Complexion", "Fair")}
                    {renderDetail("Height", "5ft 8in")}
                    {renderDetail("Gotra", "Shandilya")}
                    {renderDetail("Mool", "Sherpuri")}
                    {renderDetail("Education", "B.Tech in C.Sc, M.Tech (Pursuing from IIT Jodhpur)")}
                    {renderDetail("Employment", "Software Developer (Lead) at Capgemini")}
                </div>
            </section>

            {/* Family Details */}
            <section style={styles.section}>
                <h2 style={styles.subtitle}>Family Details</h2>
                <div style={styles.detailsGrid}>
                    {renderDetail("Grand Father", "Sri Parasnath Prasad (Retired from Tata Motors Ltd)")}
                    {renderDetail("Father", "Sanjay Kumar (Self Employed, Graduate)")}
                    {renderDetail("Mother", "Smt. Chandrakala Devi (Housewife)")}
                    {renderDetail("Sibling", "Ms Sanjana Shree, studying Forensic Science at Christ University, Bangalore")}
                    {renderDetail(
                        "Uncle",
                        <>
                            Sri Santosh Kumar (Employed in Tata Motors)
                            <br />
                            Sri Manoj Kumar  (Chief Manager, Bank of Baroda, Ahmedabad)
                        </>
                    )}
                </div>
            </section>

            {/* Contact Details */}
            <section style={styles.sectionFooter}>
                <h2 style={styles.subtitle}>Contact Information</h2>
                <p style={styles.contact}><strong>Resident Address:</strong> 21, Subhash Chandra Path, Jyoti Nagar, Kharangajhar, Telco, PO Telco, Jamshedpur, Jharkhand</p>
                <p style={styles.contact}>
                    <strong>Contact No:</strong>{' '}
                    <a href="tel:+919835552756" style={styles.phoneLink}>+91 9835552756</a>
                </p>
            </section>
        </div>
    );
};

const renderDetail = (label, value) => (
    <div style={styles.detail}>
        <span style={styles.label}>{label}</span>
        <span style={styles.colon}>:</span>
        <span style={styles.value}>{value}</span>
    </div>
);

const styles = {
    container: {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '30px',
        background: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        animation: 'fadeIn 1.2s ease-in-out',
    },
    sectionHeader: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#333',
        paddingBottom: '10px',
        borderBottom: '4px solid #7f7fd5',
    },
    section: {
        marginBottom: '25px',
        animation: 'slideIn 0.9s ease-in-out',
    },
    subtitle: {
        fontSize: '1.8rem',
        fontWeight: '600',
        color: '#555',
        paddingBottom: '8px',
        marginBottom: '15px',
        borderBottom: '2px solid #ddd',
        transition: 'color 0.4s ease',
    },
    detailsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '15px',
    },
    detail: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    label: {
        fontWeight: 'bold',
        flex: '1',
        color: '#444',
        transition: 'color 0.3s',
    },
    colon: {
        margin: '0 10px',
        color: '#888',
    },
    value: {
        flex: '2',
        color: '#333',
        fontSize: '1.1rem',
    },
    sectionFooter: {
        textAlign: 'center',
        paddingTop: '15px',
        borderTop: '1px solid #ddd',
    },
    contact: {
        fontSize: '1.2rem',
        color: '#444',
        marginBottom: '10px',
    },
    phoneLink: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
    },
    '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
    },
    '@keyframes slideIn': {
        '0%': { transform: 'translateY(20px)', opacity: 0 },
        '100%': { transform: 'translateY(0)', opacity: 1 },
    },
};

export default ProfileDetails;
