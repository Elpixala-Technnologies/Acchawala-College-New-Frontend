export type ID = number | null;

export interface DesiredCollegesInformation {
	data: {
		id: number;
		attributes: {
			college: string;
			current_step: string;
			[key: string]: string | number;
		};
	}[];
}

interface UserData {
	name: string | undefined;
	email: string | undefined;
	number: string | undefined;
	gender: string | undefined;
	city: string | undefined;
	courseIntrested: string | undefined;
}

export interface InformationProps {
	userMetaId: ID;
	setSelectedOption: Function;
	userData: UserData;
}

export interface GraduationDetails {
	id?: string;
	institutionName: string;
	passingYear: string;
	gradingSystem: string;
	grade: string;
	course: string;
}

export interface SecondaryEducationDetails {
	id: string;
	schoolName: string;
	city: string;
	passingYear: string;
	gradingSystem: string;
	grade: string;
	board: string;
	stream: string;
}

export interface PrimaryEducation {
	id: string;
	schoolName: string;
	city: string;
	passingYear: string;
	gradingSystem: string;
	grade: string;
	board: string;
}
export interface EducationDetailsProps {
	userMetaId: ID;
	setSelectedOption: Function;
	primaryEducation?: PrimaryEducation[];
	secondaryEducation?: SecondaryEducationDetails[];
	graduation?: GraduationDetails[];
}
export interface UserInformation {
	firstName: string;
	lastName: string;
	email: string;
	number: string;
	gender: string;
	city: string;
	interestedCourse: string;
}

export interface GraduataionDetails {
	institutionName: string;
	passingYear: string;
	gradingSystem: string;
	grade: string;
	course: string;
}
export interface EducationSecondaryDetails {
	schoolName: string;
	city: string;
	passingYear: string;
	gradingSystem: string;
	grade: string;
	board: string;
	stream: string;
}

export interface EducationPrimaryDetails {
	schoolName: string;
	city: string;
	passingYear: string;
	gradingSystem: string;
	grade: string;
	board: string;
}

export interface ProfessionalInformation {
	data: {
		id: number;
		attributes: {
			organizationName: string;
			jobPosition: string;
			jobStart: string;
			jobEnd: string;
			[key: string]: string | number;
		};
	}[];
}
export interface UserSubmittedData {
	name: string;
	email: string;
	number: string;
	isWhatsappNo: boolean;
	stream: string;
	courseLevel: string;
}