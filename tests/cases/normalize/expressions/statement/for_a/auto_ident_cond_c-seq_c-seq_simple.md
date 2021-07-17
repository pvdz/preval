# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > For a > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((10, 20, $(30)) ? (40, 50, $(60)) : $($(100)); $(0); );
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
  while ($(0)) {}
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(30);
if (tmpIfTest) {
  $(60);
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
const tmpIfTest = $(30);
if (tmpIfTest) {
  $(60);
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
 - 1: 30
 - 2: 60
 - 3: 0
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
