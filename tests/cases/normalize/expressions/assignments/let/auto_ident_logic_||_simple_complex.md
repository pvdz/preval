# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Assignments > Let > Auto ident logic || simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = 0 || $($(1)));
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = 0 || $($(1)));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 0;
if (a) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
}
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let SSA_a = 0;
if (SSA_a) {
} else {
  const tmpCalleeParam = $(1);
  SSA_a = $(tmpCalleeParam);
}
const xyz = SSA_a;
$(xyz);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
