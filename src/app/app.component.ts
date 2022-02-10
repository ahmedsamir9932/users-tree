import { HttpClient } from '@angular/common/http';
import {Component,OnInit,ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    providers: [MessageService],
    styleUrls: ['./app.component.scss']
})
export class AppComponent { 
    data1: TreeNode[];
    selectedNode: TreeNode;

    node = [];

    constructor(private messageService: MessageService, private http: HttpClient) {}

    ngOnInit() {
        this.http.get('../assets/users.json').subscribe((response: any[]) => {
            

            var data = response,
            tree = function (data, root) {
            var t = {};
            data.forEach(o => {
            Object.assign(t[o.id] = t[o.id] || {}, o);
            t[o.parent] = t[o.parent] || {};
            t[o.parent].children = t[o.parent].children || [];
            t[o.parent].children.push(t[o.id]);
        });
        return t[root].children;
    }(data, undefined);

    console.log(tree);
            
            
    
            let mTree = tree.map(el => {
                return {
                    label: el.code,
                    type: 'person',
                    styleClass: 'p-person',
                    expanded: true,
                    data: 
                    {
                    name:el.name, 'avatar': el.imagePath
                    },
                    children: el.children?.map(elChild => {
                        return {
                            label: elChild.code.split('.').slice(-1)[0],
                            type: 'person',
                            styleClass: 'p-person',
                            expanded: true,
                            data: 
                            {
                            name:elChild.name, 'avatar': elChild.imagePath
                            },  
                            children: elChild?.children?.map(elChildChild => {
                                return {
                                    label: elChildChild.code.split('.').slice(-1)[0],
                                    type: 'person',
                                    styleClass: 'p-person',
                                    expanded: true,
                                    data: 
                                    {
                                    name:elChildChild.name, 'avatar': elChildChild.imagePath
                                    },
                                    children: elChildChild?.children?.map(elChildChildChild => {
                                        return {
                                            label: elChildChildChild.code.split('.').slice(-1)[0],
                                            type: 'person',
                                            styleClass: 'p-person',
                                            expanded: true,
                                            data: 
                                            {
                                            name:elChildChildChild.name, 'avatar': elChildChildChild.imagePath
                                            },
                                        }
                                    })
                                }
                            })
                        }
                    })    
                }
            })
            this.data1 = mTree;    
            
        })
        
        // this.data1 = [{
        //     label: '0001',
        //     type: 'person',
        //     styleClass: 'p-person',
        //     expanded: true,
        //     data: 
        //     {
        //     name:'ahmed', 'avatar': 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg'
        //     },
        //     children: [
        //         {
        //             label: '0003',
        //             type: 'person',
        //             styleClass: 'p-person',
        //             expanded: true,
        //             data: {name:'ali', 'avatar': 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg'},
        //             children:[
        //                 {
        //                     label: '0004',
        //                     type: 'person',
        //                     styleClass: 'p-person',
        //                     expanded: true,
        //                     data: {name:'ibrahim', 'avatar': 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg'},
        //                     children:[
        //                         {
        //                             label: '0002',
        //                             type: 'person',
        //                             styleClass: 'p-person',
        //                             expanded: true,
        //                             data: {name:'mohamed', 'avatar': 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg'},
        //                         },
        //                         {
        //                             label: '0007',
        //                             type: 'person',
        //                             styleClass: 'p-person',
        //                             expanded: true,
        //                             data: {name:'hany', 'avatar': 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg'},
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //         {
        //             label: '0010',
        //             type: 'person',
        //             styleClass: 'p-person',
        //             expanded: true,
        //             data: {name:'abdullah', 'avatar': 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg'},
        //             children:[
        //                 {
        //                     label: '0005',
        //                     type: 'person',
        //                     styleClass: 'p-person',
        //                     expanded: true,
        //                     data: {name:'mahmoud', 'avatar': 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg'},
        //                     children:[
        //                         {   // here 
        //                             label: '0008',
        //                             type: 'person',
        //                             styleClass: 'p-person',
        //                             expanded: true,
        //                             data: {name:'samir', 'avatar': 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg'},
        //                             children:[
                                        
        //                             ]
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     label: '0006',
        //                     type: 'person',
        //                     styleClass: 'p-person',
        //                     expanded: true,
        //                     data: {name:'samy', 'avatar': 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg'},
        //                     children:[
        //                         {   // here 
        //                             label: '0009',
        //                             type: 'person',
        //                             styleClass: 'p-person',
        //                             expanded: true,
        //                             data: {name:'khalid', 'avatar': 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg'},
        //                             children:[
                                        
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     ]
        // }];
    }

    onNodeSelect(event) {
        this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
    }
}
