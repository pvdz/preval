# Preval test case

# ident_call_computed_complex_simple2.md

> Normalize > Expressions > Assignments > Logic and right > Ident call computed complex simple2
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(100) && (a = $(b)["$"](1)));
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpCallObj = $(b);
  const tmpNestedComplexRhs = tmpCallObj.$(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { $: $ };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpCallObj = $(b);
  const tmpNestedComplexRhs = tmpCallObj.$(1);
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
