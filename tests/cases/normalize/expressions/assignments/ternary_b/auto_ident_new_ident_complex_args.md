# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(1) ? (a = new $($(1), $(2))) : $(200));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$($(1) ? (a = new $($(1), $(2))) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpNewCallee = $;
  const tmpCalleeParam$1 = $(1);
  const tmpCalleeParam$2 = $(2);
  const tmpNestedComplexRhs = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$2);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(1);
  const tmpCalleeParam$2 = $(2);
  const tmpNestedComplexRhs = new $(tmpCalleeParam$1, tmpCalleeParam$2);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: {}
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
