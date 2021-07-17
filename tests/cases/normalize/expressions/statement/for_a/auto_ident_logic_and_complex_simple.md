# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > For a > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ($($(1)) && 2; $(0); );
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $($(1)) && 2;
  while ($(0)) {}
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
let tmpIfTest$1 = $(0);
while (tmpIfTest$1) {
  tmpIfTest$1 = $(0);
}
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
$(tmpCalleeParam);
let tmpIfTest$1 = $(0);
while (tmpIfTest$1) {
  tmpIfTest$1 = $(0);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 0
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
