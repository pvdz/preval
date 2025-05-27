# Preval test case

# redundant_break.md

> Tofix > redundant break
>
> Based on the output it seems we're not (always?) removing redundant breaks
> 
> $(0);
> while (true) {
>   const tmpIfTest = $(true);
>   if (tmpIfTest) {
>     $continue: {
>       break;
>     }
>   } else {
>     break;
>   }
> }
> $(2);

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if (1) break foo;
  else continue foo;
}
$(2);
`````


## Settled


`````js filename=intro
$(0);
$(true);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(true);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
$( true );
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(0);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $continue: {
      break;
    }
  } else {
    break;
  }
}
$(2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: true
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
