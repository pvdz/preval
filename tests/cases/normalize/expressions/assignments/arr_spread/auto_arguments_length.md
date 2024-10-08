# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Arr spread > Auto arguments length
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
const tmpCalleeParam /*:array*/ = [...a];
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = arguments;
const b = [ ...a ];
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
    '<function>',
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
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    2.220446049250313e-16,
    1.7976931348623157e308,
    5e-324,
    -Infinity,
    Infinity,
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
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
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    {},
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    {},
    '<function>',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    '<function>',
    '<function>',
    '<function>',
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
    '<function>',
    2.718281828459045,
    2.302585092994046,
    0.6931471805599453,
    0.4342944819032518,
    1.4426950408889634,
    3.141592653589793,
    0.7071067811865476,
    1.4142135623730951,
    '<function>',
    '<function>',
    '<function>',
    '<function>',
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
    true,
  ],

 - 2: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
