# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > For a > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (new $($(1), $(2)); $(0); );
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  new $($(1), $(2));
  while ($(0)) {}
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
let tmpIfTest = $(0);
while (tmpIfTest) {
  tmpIfTest = $(0);
}
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new $(tmpCalleeParam, tmpCalleeParam$1);
let tmpIfTest = $(0);
while (tmpIfTest) {
  tmpIfTest = $(0);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 0
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
