# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new ($($))($(1), $(2))) || (a = new ($($))($(1), $(2))));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$2);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNewCallee$1 = $($);
  const tmpCalleeParam$3 = $(1);
  const tmpCalleeParam$4 = $(2);
  const tmpNestedComplexRhs = new tmpNewCallee$1(tmpCalleeParam$3, tmpCalleeParam$4);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
let SSA_a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$2);
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  const tmpNewCallee$1 = $($);
  const tmpCalleeParam$3 = $(1);
  const tmpCalleeParam$4 = $(2);
  const tmpNestedComplexRhs = new tmpNewCallee$1(tmpCalleeParam$3, tmpCalleeParam$4);
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
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: {}
 - 6: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
