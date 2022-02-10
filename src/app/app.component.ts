import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data1: TreeNode[];
  selectedNode: TreeNode;

  node = [];

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http
      .get('../assets/users.json')
      .pipe(
        map((res: any[]) => {
          let updatedArr = res.map((el) => {
            return {
              ...el,
              parent: el.code.split('.').slice(0, -1).join('.'),
              id: el.code,
            };
          });
          return updatedArr;
        })
      )
      .subscribe((response) => {
        response.forEach((el) => {
          if (el.code.split('.').length <= 1) {
            delete el.parent;
          }
        });

        var data = response,
          tree = (function (data, root) {
            var t = {};
            data.forEach((o) => {
              Object.assign((t[o.id] = t[o.id] || {}), o);
              t[o.parent] = t[o.parent] || {};
              t[o.parent].children = t[o.parent].children || [];
              t[o.parent].children.push(t[o.id]);
            });
            return t[root].children;
          })(data, undefined);

        let mTree = tree.map((el) => {
          return {
            label: el.code,
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: {
              name: el.name,
              avatar: el.imagePath,
            },
            children: el.children?.map((elChild) => {
              return {
                label: elChild.code.split('.').slice(-1)[0],
                type: 'person',
                styleClass: 'p-person',
                expanded: true,
                data: {
                  name: elChild.name,
                  avatar: elChild.imagePath,
                },
                children: elChild?.children?.map((elChildChild) => {
                  return {
                    label: elChildChild.code.split('.').slice(-1)[0],
                    type: 'person',
                    styleClass: 'p-person',
                    expanded: true,
                    data: {
                      name: elChildChild.name,
                      avatar: elChildChild.imagePath,
                    },
                    children: elChildChild?.children?.map(
                      (elChildChildChild) => {
                        return {
                          label: elChildChildChild.code.split('.').slice(-1)[0],
                          type: 'person',
                          styleClass: 'p-person',
                          expanded: true,
                          data: {
                            name: elChildChildChild.name,
                            avatar: elChildChildChild.imagePath,
                          },
                        };
                      }
                    ),
                  };
                }),
              };
            }),
          };
        });
        this.data1 = mTree;
      });
  }

  onNodeSelect(event) {
    this.messageService.add({
      severity: 'success',
      summary: 'Node Selected',
      detail: event.node.label,
    });
  }
}
