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
-> 6
-> 3
-> 6
-------- test case
-> 6
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
    $(a = b.foo = $(6));
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
  console.log('-------- start');
  const b = {
    get foo() {
      const tmpReturnArg = $(2);
      return tmpReturnArg;
    },
    set foo(x) {
      const tmpReturnArg$1 = $(3);
      return tmpReturnArg$1;
    },
  };
  console.log('-------- bound');
  let a = 1;
  console.log('-------- let 1');
  const tmpCallCallee = $;
  let tmpCalleeParam;
  let tmpNestedComplexRhs;
  let tmpNestedAssignPropRhs = $(6);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.foo = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  tmpCallCallee(tmpCalleeParam);
  console.log('-------- test case');
  $(a);
  console.log('-------- a');
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = b.foo;
  tmpCallCallee$1(tmpCalleeParam$1);
  console.log('-------- a.foo');
  const tmpCallCallee$2 = $;
  let tmpCalleeParam$2;
  const tmpNestedPropAssignRhs$1 = 4;
  b.foo = tmpNestedPropAssignRhs$1;
  tmpCalleeParam$2 = tmpNestedPropAssignRhs$1;
  tmpCallCallee$2(tmpCalleeParam$2);
  console.log('-------- a.foo = 4');
}
f();
`````

## Output

`````js filename=intro
function f() {
  console.log('-------- start');
  const b = {
    get foo() {
      const tmpReturnArg = $(2);
      return tmpReturnArg;
    },
    set foo(x) {
      const tmpReturnArg$1 = $(3);
      return tmpReturnArg$1;
    },
  };
  console.log('-------- bound');
  let a = 1;
  console.log('-------- let 1');
  const tmpCallCallee = $;
  let tmpCalleeParam;
  let tmpNestedComplexRhs;
  let tmpNestedAssignPropRhs = $(6);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.foo = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  tmpCallCallee(tmpCalleeParam);
  console.log('-------- test case');
  $(a);
  console.log('-------- a');
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = b.foo;
  tmpCallCallee$1(tmpCalleeParam$1);
  console.log('-------- a.foo');
  const tmpCallCallee$2 = $;
  let tmpCalleeParam$2;
  b.foo = 4;
  tmpCalleeParam$2 = 4;
  tmpCallCallee$2(tmpCalleeParam$2);
  console.log('-------- a.foo = 4');
}
f();
`````

## Result

Should call `$` with:
 - 1: 6
 - 2: 3
 - 3: 6
 - 4: 6
 - 5: 2
 - 6: 2
 - 7: 3
 - 8: 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
