# Preval test case

# number.md

> Spying > Number
>
> Apply Number to a spy

#TODO

## Input

`````js filename=intro
$(Number($spy()));

$(Number($spy(1, 2)));

$(Number($spy('x', 'y')));
`````

## Pre Normal

`````js filename=intro
$(Number($spy()));
$(Number($spy(1, 2)));
$(Number($spy(`x`, `y`)));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpStringFirstArg = $spy();
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpStringFirstArg$1 = $spy(1, 2);
const tmpCalleeParam$1 = $coerce(tmpStringFirstArg$1, `number`);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpStringFirstArg$3 = $spy(`x`, `y`);
const tmpCalleeParam$3 = $coerce(tmpStringFirstArg$3, `number`);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const tmpStringFirstArg = $spy();
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
$(tmpCalleeParam);
const tmpStringFirstArg$1 = $spy(1, 2);
const tmpCalleeParam$1 = $coerce(tmpStringFirstArg$1, `number`);
$(tmpCalleeParam$1);
const tmpStringFirstArg$3 = $spy(`x`, `y`);
const tmpCalleeParam$3 = $coerce(tmpStringFirstArg$3, `number`);
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: 12345
 - 4: 'Creating spy', 2, 2, [1, 2]
 - 5: '$spy[2].valueOf()', 2
 - 6: 2
 - 7: 'Creating spy', 3, 2, ['x', 'y']
 - 8: '$spy[3].valueOf()', 'y'
 - 9: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
