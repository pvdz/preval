# Preval test case

# auto_ident_call_ident_complex_args.md

> normalize > expressions > assignments > param_default > auto_ident_call_ident_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = (a = $($(1), $(2)))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    const tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$1(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    const tmpNestedComplexRhs = $(tmpCalleeParam, tmpCalleeParam$1);
    a = tmpNestedComplexRhs;
  }
}
let a = { a: 999, b: 1000 };
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: undefined
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
