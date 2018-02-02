import { Actions } from 'react-native-router-flux'
let data = [
    {
        id: 1,
        cover: '../img/icons-10.png',
        title: 'Voters Guide',
        screen: 'guide',
        scheme: '#ddd',
        resolve: function() {
            Actions.guide({data:data})
        }
        
    },
    {
        id: 2,
        cover: '../img/icons-15.png',
        title: 'The Promise',
        screen: 'promise',
        scheme: '#eee',
        resolve: function() {
            Actions.promise({data:data})
        }
        
    },
    {
        id: 3,
        cover: '../img/icons-16.png',
        title: 'Add your Manifest',
        screen: 'manifest',
        scheme: '#ddd',
        resolve: function() {
            Actions.manifest({data:data})
            
        }
        
    },
    {
        id: 4,
        cover: '../img/icons-17.png',
        title: 'National Issues',
        screen: 'issues',
        scheme: '#eee',
        resolve: function() {
            Actions.issues({data:data})
        }
        
    },
    {
        id: 5,
        cover: '../img/icons-18.png',
        title: 'Chat with Atiku',
        screen: 'chat',
        scheme: '#ddd',
        resolve: function() {
            Actions.chat({data:data})
        }
        
    },
    {
        id: 6,
        cover: '../img/icons-19.png',
        title: 'Rate Atiku',
        screen: 'rate',
        scheme: '#eee',
        resolve: function() {
            Actions.rate({data:data})
        }
        
    },
    {
        id: 7,
        cover: '../img/icons-20.png',
        title: 'Opportunity Center',
        screen: 'opportunity',
        scheme: '#ddd',
        resolve: function() {
            Actions.opportunity({data:data})
        }
        
    },
    {
        id: 8,
        cover: '../img/icons-21.png',
        title: 'Getting your PVC',
        screen: 'pvc',
        scheme: '#eee',
        resolve: function() {
            Actions.pvc({data:data})
        }
        
    },
    {
        id: 9,
        cover: '25',
        title: 'Join the Atiku Campaign',
        screen: 'campaign',
        scheme: '#ddd',
        resolve: function() {
            Actions.campaign({data:data})
        }
        
    },
    {
        id: 10,
        cover: '../img/icons-9.png',
        title: 'Refer a Friend',
        screen: 'refer',
        scheme: '#eee',
        resolve: function() {
            Actions.refer({data:data})
        }
        
    }
];

module.exports = data;