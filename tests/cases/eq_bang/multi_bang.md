# Preval test case

# multi_bang.md

> Eq bang > Multi bang
>
> A comparison followed by a bang on the result which is then tested is redundant if the value is not used anywhere else.

Found in Tenko, inside _parseClassBody

#TODO

## Input

`````js filename=intro
const a = $(1);
const b = $(2);
const same = a === b;
$(!same);
$(!same);
$(!same);
`````

## Pre Normal

`````js filename=intro
const a = $(1);
const b = $(2);
const same = a === b;
$(!same);
$(!same);
$(!same);
`````

## Normalized

`````js filename=intro
const a = $(1);
const b = $(2);
const same = a === b;
const tmpCallCallee = $;
const tmpCalleeParam = !same;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = !same;
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = !same;
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const a = $(1);
const b = $(2);
const same = a !== b;
$(same);
$(same);
$(same);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a !== b;
$( c );
$( c );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true
 - 4: true
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
