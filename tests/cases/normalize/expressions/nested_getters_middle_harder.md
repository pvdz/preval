# Preval test case

# nested_getters_middle.md

> normalize > assignment > nested_getters_middle
>
> Example of how getters and setters make the transform for `a=b.foo=c` non-trivial.

Using
```
function $(a) { $('->', a); return a }
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
    $(a = b.foo = $(6));
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
      return $(2);
    },
    set foo(x) {
      return $(3);
    },
  };
  $('-------- bound');
  let a = 1;
  $('-------- let 1');
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
  $('-------- test case');
  $(a);
  $('-------- a');
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = b.foo;
  tmpCallCallee$1(tmpCalleeParam$1);
  $('-------- a.foo');
  const tmpCallCallee$2 = $;
  let tmpCalleeParam$2;
  const tmpNestedPropAssignRhs$1 = 4;
  b.foo = tmpNestedPropAssignRhs$1;
  tmpCalleeParam$2 = tmpNestedPropAssignRhs$1;
  tmpCallCallee$2(tmpCalleeParam$2);
  $('-------- a.foo = 4');
}
f();
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: '-------- start'
 - 2: '-------- bound'
 - 3: '-------- let 1'
 - 4: 6
 - 5: 3
 - 6: 6
 - 7: '-------- test case'
 - 8: 6
 - 9: '-------- a'
 - 10: 2
 - 11: 2
 - 12: '-------- a.foo'
 - 13: 3
 - 14: 4
 - 15: '-------- a.foo = 4'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
