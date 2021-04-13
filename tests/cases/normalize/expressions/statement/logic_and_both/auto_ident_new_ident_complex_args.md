# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > Logic and both > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new $($(1), $(2)) && new $($(1), $(2));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
new $($(1), $(2)) && new $($(1), $(2));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpIfTest = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
if (tmpIfTest) {
  const tmpNewCallee$1 = $;
  const tmpCalleeParam$3 = $(1);
  const tmpCalleeParam$5 = $(2);
  new tmpNewCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
} else {
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpIfTest = new $(tmpCalleeParam, tmpCalleeParam$1);
if (tmpIfTest) {
  const tmpCalleeParam$3 = $(1);
  const tmpCalleeParam$5 = $(2);
  new $(tmpCalleeParam$3, tmpCalleeParam$5);
} else {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 2
 - 6: 1, 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
