# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > If > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = $(1) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = $(1) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  a = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpIfTest = a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  a = $(60);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
