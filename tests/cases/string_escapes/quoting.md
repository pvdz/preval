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


## Settled


`````js filename=intro
eval(`hello"\`world"`);
eval(`hello"'world"`);
eval(`hello'\`world'`);
eval(`hello\\"\\\`world"`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
eval(`hello"\`world"`);
eval(`hello"'world"`);
eval(`hello'\`world'`);
eval(`hello\\"\\\`world"`);
`````


## PST Settled
With rename=true

`````js filename=intro
eval( "hello\"`world\"" );
eval( "hello\"'world\"" );
eval( "hello'`world'" );
eval( "hello\\\"\\`world\"" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Unexpected string ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
