# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Call > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCalleeParam = $(60);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCalleeParam = $(60);
} else {
  const tmpCalleeParam$1 = $(100);
  tmpCalleeParam = $(tmpCalleeParam$1);
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
