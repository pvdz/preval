# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > For a > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ($(1) ? 2 : $($(100)); $(0); );
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $(1) ? 2 : $($(100));
  while ($(0)) {}
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpCallCallee(tmpCalleeParam);
}
let tmpIfTest$1 = $(0);
while (tmpIfTest$1) {
  tmpIfTest$1 = $(0);
}
$(a);
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  $(tmpCalleeParam);
}
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
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
