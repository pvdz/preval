# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(10, 20, $(30)) ? $(2) : $($(100))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(10, 20, $(30)) ? $(2) : $($(100))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpCalleeParam$1 = $(2);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$2 = $(100);
  tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$2);
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpCalleeParam$1 = $(2);
} else {
  const tmpCalleeParam$2 = $(100);
  tmpCalleeParam$1 = $(tmpCalleeParam$2);
}
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: ['before ', ' after'], 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
