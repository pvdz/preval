# Preval test case

# const-plus.md

> random > const-plus
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

## Normalized

`````js filename=intro
const x = 'a';
const y = 'b' + x;
const z = x + y;
const xyz = z;
$(xyz);
`````

## Output

`````js filename=intro
const x = 'a';
const y = 'b' + x;
const z = x + y;
const xyz = z;
$(xyz);
`````

## Result

Should call `$` with:
 - 1: 'aba'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
