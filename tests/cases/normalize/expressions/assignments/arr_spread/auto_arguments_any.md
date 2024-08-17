# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Arr spread > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = arguments)]);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = arguments)]);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = arguments;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const a = arguments;
const tmpCalleeParam = [...a];
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = arguments;
const b = [ ... a ];
$( b );
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: 
  [
    '<$>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<$spy>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    true,
    [],
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    {},
    '<function>',
    {},
    {},
    '<function>',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    '<function>',
    {},
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    {},
    '<function>',
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ],

 - 2: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
