# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = (10, 20, $(30)) ? (40, 50, 60) : $($(100)))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$3 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$3);
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam$3 = $(100);
  a = $(tmpCalleeParam$3);
}
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: ['before ', ' after'], 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
