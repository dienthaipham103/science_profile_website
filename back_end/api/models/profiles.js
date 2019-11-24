class GetOneProfile{
    constructor(){
        this.personal_info = {};
        this.language = [];
        this.education = [];
        this.work = [];
        this.research = [];
        this.publication = [];
        this.project = [];
    };

    getValue(key, value){
        switch(key){
            case 'personal_info':
                this.personal_info = value;
                break;
            case `language`:
                this.language = value;
                break;
            case 'education':
                this.education = value;
                break;
            case 'work':
                this.work = value;
                break;
            case 'research':
                this.research = value;
                break;
            case 'publication':
                this.publication = value;
                break;
            case 'project':
                this.project = value;
                break;
        }
    };

}

module.exports = GetOneProfile;