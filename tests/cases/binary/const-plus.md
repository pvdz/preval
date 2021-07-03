# Preval test case

# const-plus.md

> Binary > Const-plus
>
> Const inlining with addition inlining will require a loop of sorts

## Input

`````js filename=intro
const x = 'a';
const y = 'b' + x;
const z = x + y;
const xyz = z;
$(xyz);
`````

## Pre Normal

`````js filename=intro
const x = `a`;
const y = `b` + x;
const z = x + y;
const xyz = z;
$(xyz);
`````

## Normalized

`````js filename=intro
const x = `a`;
const tmpStringConcatL = $coerce(x, `plustr`);
const y = `b${tmpStringConcatL}`;
const z = x + y;
const xyz = z;
$(xyz);
`````

## Output

`````js filename=intro
$(`aba`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'aba'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
