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
    $('-------- start');
    const b = {
      get foo() {
        return $(2);
      }, set foo(x) {
        return $(3);
      },
    };
    $('-------- bound');
    let a = 1;
    $('-------- let 1');
    $(a = b.foo = 5);
    $('-------- test case');
    $(a); // 5 (!)
    $('-------- a');
    $(b.foo); // 2 (not 3!)
    $('-------- a.foo');
    $(b.foo = 4); // 4 (setter return value is ignored)
    $('-------- a.foo = 4');
}
f();
`````

## Normalized

`````js filename=intro
function f() {
  $('-------- start');
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
  $('-------- bound');
  let a = 1;
  $('-------- let 1');
  const tmpCallCallee = $;
  const tmpNestedPropAssignRhs = 5;
  b.foo = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpCalleeParam = a;
  tmpCallCallee(tmpCalleeParam);
  $('-------- test case');
  $(a);
  $('-------- a');
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = b.foo;
  tmpCallCallee$1(tmpCalleeParam$1);
  $('-------- a.foo');
  const tmpCallCallee$2 = $;
  const varInitAssignLhsComputedRhs = 4;
  b.foo = varInitAssignLhsComputedRhs;
  const tmpCalleeParam$2 = varInitAssignLhsComputedRhs;
  tmpCallCallee$2(tmpCalleeParam$2);
  $('-------- a.foo = 4');
}
f();
`````

## Output

`````js filename=intro
function f() {
  $('-------- start');
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
  $('-------- bound');
  let a = 1;
  $('-------- let 1');
  b.foo = 5;
  a = 5;
  let tmpCalleeParam = a;
  $(tmpCalleeParam);
  $('-------- test case');
  $(a);
  $('-------- a');
  const tmpCalleeParam$1 = b.foo;
  $(tmpCalleeParam$1);
  $('-------- a.foo');
  b.foo = 4;
  $(4);
  $('-------- a.foo = 4');
}
f();
`````

## Result

Should call `$` with:
 - 1: '-------- start'
 - 2: '-------- bound'
 - 3: '-------- let 1'
 - 4: 3
 - 5: 5
 - 6: '-------- test case'
 - 7: 5
 - 8: '-------- a'
 - 9: 2
 - 10: 2
 - 11: '-------- a.foo'
 - 12: 3
 - 13: 4
 - 14: '-------- a.foo = 4'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
