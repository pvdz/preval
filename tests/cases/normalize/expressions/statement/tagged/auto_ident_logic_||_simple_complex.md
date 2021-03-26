# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic || simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${0 || $($(1))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${0 || $($(1))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = 0;
if (tmpCalleeParam$1) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$3 = $(1);
  tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$3);
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = 0;
if (tmpCalleeParam$1) {
} else {
  const tmpCalleeParam$3 = $(1);
  tmpCalleeParam$1 = $(tmpCalleeParam$3);
}
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: ['before ', ' after'], 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
