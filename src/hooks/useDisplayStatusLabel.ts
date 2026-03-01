import { ReferralStatus } from "@/enums/Referral";

export const displayStatusLabel = (status: string) => {
    if (!status) return '';
    const key = status.toLowerCase().replace(/\s|_/g, '');
    switch (key) {
        case ReferralStatus.Sent:
            return 'Sent';
        case ReferralStatus.ViewedByPatient:
            return 'Viewed by patient';
        case ReferralStatus.PatientReportedScheduled:
            return 'Patient reported scheduled';
        case ReferralStatus.PatientReportedUnableToReach:
            return 'Patient reported unable to reach';
        case ReferralStatus.NotInterested:
            return 'Not interested';
        case ReferralStatus.Closed:
            return 'Closed';
        default:
            // fallback: split on underscores/caps and capitalize
            return status
                .replace(/_/g, ' ')
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');
    }
};

export  const getStatusColor = (status: string) => {
    const key = (status || '').toLowerCase().replace(/\s|_/g, '');
    switch (key) {
        case 'sent':
            return 'bg-blue-100 text-blue-800';
        case 'viewedbypatient':
            return 'bg-purple-100 text-purple-800';
        case 'patientreportedscheduled':
            return 'bg-green-100 text-green-800';
        case 'patientreportedunabletoreach':
            return 'bg-orange-100 text-orange-800';
        case 'notinterested':
            return 'bg-red-100 text-red-800';
        case 'closed':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};