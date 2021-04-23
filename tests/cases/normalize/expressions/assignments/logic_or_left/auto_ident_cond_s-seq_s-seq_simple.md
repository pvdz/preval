# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, 30) ? (40, 50, 60) : $($(100))) || $(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, 30) ? (40, 50, 60) : $($(100))) || $(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpIfTest = 30;
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$(60);
$(60);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
