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
  var tmpArg_1;
  var tmpArg_2;
  console.log('-------- start');
  const b = {
    get foo() {
      return $(2);
    },
    set foo(x) {
      return $(3);
    },
  };
  console.log('-------- bound');
  let a = 1;
  console.log('-------- let 1');
  tmpArg = a = b.foo = 5;
  $(tmpArg);
  console.log('-------- test case');
  $(a);
  console.log('-------- a');
  tmpArg_1 = b.foo;
  $(tmpArg_1);
  console.log('-------- a.foo');
  tmpArg_2 = b.foo = 4;
  $(tmpArg_2);
  console.log('-------- a.foo = 4');
}
f();
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpArg_1;
  var tmpArg_2;
  console.log('-------- start');
  const b = {
    get foo() {
      return $(2);
    },
    set foo(x) {
      return $(3);
    },
  };
  console.log('-------- bound');
  let a = 1;
  console.log('-------- let 1');
  tmpArg = a = b.foo = 5;
  $(tmpArg);
  console.log('-------- test case');
  $(a);
  console.log('-------- a');
  tmpArg_1 = b.foo;
  $(tmpArg_1);
  console.log('-------- a.foo');
  tmpArg_2 = b.foo = 4;
  $(tmpArg_2);
  console.log('-------- a.foo = 4');
}
f();
`````
