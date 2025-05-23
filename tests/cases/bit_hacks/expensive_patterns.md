# Preval test case

# expensive_patterns.md

> Bit hacks > Expensive patterns
>
> We can reduce this but how frequent would we find something like this in the wild...

If nothing else it can move the call inward, to replace the assignment.

```
const bit = objDestructible & 1;
const set = bit === 1;
if (set) {
  $(16);
} else {
  $(32);
}
```

But my bonus points would be to eliminate the `if` entirely, knowing that the `& 1` part can only result in a zero or one and that the `if` basically assigns a number based on that.

```
const bit = objDestructible & 1;
const v = 15 * bit;
const y = 15 + v;
$(y);
```

Yes yes, "very common case" this one.

Alternatively, if we know the value of `bit` is `0` or `1`, then we can consider the `=== 1` redundant too.

```
const bit = objDestructible & 1;
if (bit) {
  $(16);
} else {
  $(32);
}
```

But at the time of writing none of that was happening.

## Input

`````js filename=intro
let y = undefined;
const bit = objDestructible & 1;
const set = bit === 1;
if (set) {
  y = 16;
} else {
  y = 32;
}
$(y);
`````


## Settled


`````js filename=intro
const bit /*:number*/ = objDestructible & 1;
if (bit) {
  $(16);
} else {
  $(32);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (objDestructible & 1) {
  $(16);
} else {
  $(32);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = objDestructible & 1;
if (a) {
  $( 16 );
}
else {
  $( 32 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y = undefined;
const bit = objDestructible & 1;
const set = bit === 1;
if (set) {
  y = 16;
  $(y);
} else {
  y = 32;
  $(y);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


BAD@! Found 1 implicit global bindings:

objDestructible


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
