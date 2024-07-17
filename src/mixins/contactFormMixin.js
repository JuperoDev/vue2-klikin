export default {
    data() {
      return {
        showDialog: false,
        newContact: {
          firstname: '',
          lastname: '',
          email: [''],
          phoneNumber: ['']
        }
      };
    },
    methods: {
      resetForm() {
        this.newContact = {
          firstname: '',
          lastname: '',
          email: [''],
          phoneNumber: ['']
        };
      }
    }
  };