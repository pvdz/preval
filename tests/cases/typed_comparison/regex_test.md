# Preval test case

# regex_test.md

> Typed comparison > Regex test
>
> Regex test should be inlined with the builtin symbol

#TODO

## Input

`````js filename=intro
$(/x/g.test($('x')));
`````

## Pre Normal

`````js filename=intro
$(/x/g.test($(`x`)));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCallObj = /x/g;
const tmpCallVal = tmpCallObj.test;
const tmpCalleeParam$1 = $(`x`);
const tmpCalleeParam = $dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(`x`);
const tmpCallObj = /x/g;
const tmpCalleeParam = tmpCallObj.test(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
