# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> normalize > expressions > assignments > param_default > auto_ident_call_computed_s-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = (a = (1, 2, b)[$("$")](1))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCallCompObj = b;
    const tmpCallCompProp = $('$');
    const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCallCompObj = b;
    const tmpCallCompProp = $('$');
    const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: undefined
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same