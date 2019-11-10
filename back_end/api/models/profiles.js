class GetOneProfile{
    constructor(pID, name, birthday, gender, title, cardID, email_st, email_nd, mobile, phone, fax,
        language, education, work, research, publication, project){
        this.pID = pID;
        this.name = name;
        this.birthday = birthday;
        this.gender = gender;
        this.title = title;
        this.cardID = cardID;
        this.email_st = email_st;
        this.email_nd = email_nd;
        this.mobile = mobile;
        this.phone = phone;
        this.fax = fax;
        this.language = language;
        this.education = education;
        this.work = work;
        this.research = research;
        this.publication = publication;
        this.project = project;
    }
}

module.exports = GetOneProfile;