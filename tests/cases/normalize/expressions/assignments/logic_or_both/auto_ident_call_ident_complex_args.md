# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $($(1), $(2))) || (a = $($(1), $(2))));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
a = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$3 = $(1);
  const tmpCalleeParam$4 = $(2);
  const tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$3, tmpCalleeParam$4);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
let SSA_a = $(tmpCalleeParam$1, tmpCalleeParam$2);
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$3 = $(1);
  const tmpCalleeParam$4 = $(2);
  const tmpNestedComplexRhs = $(tmpCalleeParam$3, tmpCalleeParam$4);
  SSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
