# Preval test case

# regex.md

> Constants > Regex
>
> Copy one constant into another. Should fold them.

This one is debatable because a regex is an object so this isn't necessarily safe to inline.

There are some cases, like if we can statically detect that all usages of it are going to use it as intentional. But even then, there is some state in regex object which makes unbound inlining a bad idea.

The exception, of course, is single usage (like in this test). Since that moots the problem above.

## Input

`````js filename=intro
const foo = /foo/g;
const bar = foo;
$(bar)
`````


## Settled


`````js filename=intro
const foo /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
$(foo);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $regex_constructor(`foo`, `g`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "foo", "g" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const foo = new $regex_constructor(`foo`, `g`);
const bar = foo;
$(foo);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
