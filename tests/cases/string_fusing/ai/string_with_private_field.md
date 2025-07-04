# Preval test case

# string_with_private_field.md

> String fusing > Ai > String with private field
>
> Test string concatenation with private field access

// For when we start to support this?

## Input

`````js filename=intro
// class TestClass {
//   #privateField = $("private");
//   getPrivate() { return this.#privateField; }
// }
// const instance = new TestClass();
// const result = "private: " + instance.getPrivate();
// $(result);
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro

`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
