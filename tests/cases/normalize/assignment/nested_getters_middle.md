# Preval test case

# nested_getters_middle.md

> normalize > assignment > nested_getters_middle
>
> Example of how getters and setters make the transform for `a=b.foo=c` non-trivial.

Using
```
function $(a) { console.log('->', a); return a }
```

The output ought to be

```
> f();
-------- start
-------- bound
-------- let 1
-> 3
-> 5
-------- test case
-> 5
-------- a
-> 2
-> 2
-------- a.foo
-> 3
-> 4
-------- a.foo = 4
```

#TODO

## Input

`````js filename=intro
function f() {
    console.log('-------- start');
    const b = {
      get foo() {
        return $(2);
      }, set foo(x) {
        return $(3);
      },
    };
    console.log('-------- bound');
    let a = 1;
    console.log('-------- let 1');
    $(a = b.foo = 5);
    console.log('-------- test case');
    $(a); // 5 (!)
    console.log('-------- a');
    $(b.foo); // 2 (not 3!)
    console.log('-------- a.foo');
    $(b.foo = 4); // 4 (setter return value is ignored)
    console.log('-------- a.foo = 4');
}
f();
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpNestedComplexRhs;
  var tmpNestedPropAssignRhs;
  var tmpArg_1;
  var tmpArg_2;
  var tmpNestedPropAssignRhs_1;
  console.log('-------- start');
  const b = {
    get foo() {
      {
        let tmpStmtArg = $(2);
        return tmpStmtArg;
      }
    },
    set foo(x) {
      {
        let tmpStmtArg_1 = $(3);
        return tmpStmtArg_1;
      }
    },
  };
  console.log('-------- bound');
  let a = 1;
  console.log('-------- let 1');
  tmpNestedPropAssignRhs = 5;
  b.foo = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpArg = tmpNestedComplexRhs;
  $(tmpArg);
  console.log('-------- test case');
  $(a);
  console.log('-------- a');
  tmpArg_1 = b.foo;
  $(tmpArg_1);
  console.log('-------- a.foo');
  tmpNestedPropAssignRhs_1 = 4;
  b.foo = tmpNestedPropAssignRhs_1;
  tmpArg_2 = tmpNestedPropAssignRhs_1;
  $(tmpArg_2);
  console.log('-------- a.foo = 4');
}
f();
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpNestedComplexRhs;
  var tmpNestedPropAssignRhs;
  var tmpArg_1;
  var tmpArg_2;
  var tmpNestedPropAssignRhs_1;
  console.log('-------- start');
  const b = {
    get foo() {
      let tmpStmtArg = $(2);
      return tmpStmtArg;
    },
    set foo(x) {
      let tmpStmtArg_1 = $(3);
      return tmpStmtArg_1;
    },
  };
  console.log('-------- bound');
  let a = 1;
  console.log('-------- let 1');
  tmpNestedPropAssignRhs = 5;
  b.foo = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpArg = tmpNestedComplexRhs;
  $(tmpArg);
  console.log('-------- test case');
  $(a);
  console.log('-------- a');
  tmpArg_1 = b.foo;
  $(tmpArg_1);
  console.log('-------- a.foo');
  tmpNestedPropAssignRhs_1 = 4;
  b.foo = tmpNestedPropAssignRhs_1;
  tmpArg_2 = tmpNestedPropAssignRhs_1;
  $(tmpArg_2);
  console.log('-------- a.foo = 4');
}
f();
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 5
 - 2: 5
 - 3: 2
 - 4: null
 - 5: 3
 - 6: 4
 - 7: undefined

Normalized calls: Same

Final output calls: Same
