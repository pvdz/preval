# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident logic || simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = 0 || $($(1)))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = 0 || $($(1)))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
a = 0;
if (a) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$3);
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$3 = $(1);
const tmpSSA_a$1 = $(tmpCalleeParam$3);
$(tmpCalleeParam, tmpSSA_a$1);
$(tmpSSA_a$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: ['before ', ' after'], 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
