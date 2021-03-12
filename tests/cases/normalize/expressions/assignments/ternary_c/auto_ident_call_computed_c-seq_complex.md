# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident call computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = (1, 2, $(b))[$("$")](1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = (1, 2, $(b))[$('$')](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
