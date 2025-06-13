# Preval test case

# string.md

> Normalize > Call > Bad callees > String
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
"maybe"();
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
const tmpThrowArg /*:object*/ /*truthy*/ = new $typeError_constructor(
  `[Preval] Attempting to call a value that cannot be called: \`\`maybe\`();\``,
);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
const tmpThrowArg = new $typeError_constructor(`[Preval] Attempting to call a value that cannot be called: \`\`maybe\`();\``);
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
const a = new $typeError_constructor( "[Preval] Attempting to call a value that cannot be called: ``maybe`();`" );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`before`);
const tmpThrowArg = new $typeError_constructor(`[Preval] Attempting to call a value that cannot be called: \`\`maybe\`();\``);
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
