# Preval test case

# assign_to_prop.md

> Array > Manipulation > Assign to prop
>
> Assigning to index properties can be treated special
>
> if a func doesn't escape
> - if .prototype is cached
>   - if props are added to it
>   - if `new` is called
>   - temporal problems. the example is already conditional
>
>
> x=F.prototype
> record prop AiANSj on F.prototype referencing global constant tmpAssignMemRhs$7 (func)
> record prop THGZtt on F.prototype referencing global constant tmpAssignMemRhs$9 (func)
> record prop ztAIny on F.prototype referencing global constant tmpAssignMemRhs$11 (func)
> new tmpClusterSSA__0x4edc7d
> - call tmpClusterSSA__0x4edc7d and assert `this` refers to tmpClusterSSA__0x4edc7d.prototype
> - consider added properties on it on an own object
> - can we move those out?
>   - if a function is only `new`ed then assignments to `this` can be applied to the resulting object instead... too noisy? too much code inflation? or just fine
>   - what's the advantage? so what if the constructor is empty?
>     -- consider the object special insofar that it has those props and the prototype props?
>     --
>
>
> if you pick a function.prototype and assign it stuff
> and you call new on the function
> then the object and the this will have that prototype available to it
> so if the function doesn't escape then you can track the new calls on it
> and in that case construct the this object proper
>
> when calling new and we know the prototype and the func doesnt escape, the
> result is an object with a known prototype and we can resolve stuff
> we may even be able to detect unused prototype stuffs this way although
> that is a lot trickier since `this` would have to be resolved every step of
> the way

## Input

`````js filename=intro
const arr = [];
arr[0] = 10;
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [10];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([10]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10 ];
$( a );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [10]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
