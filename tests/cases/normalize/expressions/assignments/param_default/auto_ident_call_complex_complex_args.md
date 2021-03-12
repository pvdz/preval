# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Param default > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = (a = $($)($(1), $(2)))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $($);
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    const tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__pattern;
  }
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$1(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $($);
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    const tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    a = tmpNestedComplexRhs;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: undefined
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
