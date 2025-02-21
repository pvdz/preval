# Preval test case

# quoting.md

> String escapes > Quoting
>
> Trying to replicate a quote escape bug

## Input

`````js filename=intro
eval('hello"`world"');
eval(`hello"'world"`);
eval("hello'`world'");
eval('hello\\"\\`world"');
`````

## Pre Normal


`````js filename=intro
eval(`hello"\`world"`);
eval(`hello"'world"`);
eval(`hello'\`world'`);
eval(`hello\\"\\\`world"`);
`````

## Normalized


`````js filename=intro
eval(`hello"\`world"`);
eval(`hello"'world"`);
eval(`hello'\`world'`);
eval(`hello\\"\\\`world"`);
`````

## Output


`````js filename=intro
eval(`hello"\`world"`);
eval(`hello"'world"`);
eval(`hello'\`world'`);
eval(`hello\\"\\\`world"`);
`````

## PST Output

With rename=true

`````js filename=intro
eval( "hello\"`world\"" );
eval( "hello\"'world\"" );
eval( "hello'`world'" );
eval( "hello\\\"\\`world\"" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Unexpected string ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
