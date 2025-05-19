# Preval test case

# while10.md

> Ref tracking > Done > While-if > While10
>
> A let binding defined in an outer block than the nested while
> 
> // SSA
> {
>   let x = 1;
>   $if(x);
>   function $if(x) {
>     function $yes(x) {
>       function $continue(x) {
>         function $continue2(x) {
>           if ($) {
>             $(x); // Can still see 2 due to outer loop
>           } else {
>             $(x);
>             x = 2;
>             $break2(x);
>             return;
>           }
>           $continue2(x);
>           return;
>         }
>         $continue2(x);
>         return;
>       }
>       function $break2(x) {
>         $continue(x);
>         return;
>       }
>       function $break(x) {
>         after(x);
>         return;
>       }
>       $('after while', x);
>       $after(x);
>       return;
>     }
>     function $after(x) {
>       $('end', x);
>       return;
>     }
>     if ($) {
>       $yes(x);
>     } else {
>       $('oh');
>       $after(x);
>     }
>   }
> }
> 
> 
> // Reduction
> {
>   if ($) {
>     $('after while', 1);
>     $continue2(1);
>   } else {
>     $('oh');
>     $('end', 1);
>   }
>   function $continue2(x) {
>     if ($) {
>       $(x); // Can still see 2 due to outer loop
>       $continue2(x);
>       return;
>     } else {
>       $(x);
>       $continue2(2);
>       return;
>     }
>   }
> }
> 
> // Recompile
> {
>   if ($) {
>     $('after while', 1);
>     let x = 1;
>     while (true) {
>       if ($) {
>         $(x); // Can still see 2 due to outer loop
>       } else {
>         $(x);
>         x = 2;
>       }      
>     }
>   } else {
>     $('oh');
>     $('end', 1);
>   }
> }
>

## Options

## Input

`````js filename=intro
let x = 1;
if ($) {
  while (true) {
    while (true) {
      if ($) {
        $(x); // Can still see 2 due to outer loop
      } else {
        $(x);
        x = 2;
        break;
      }
    }
  }
  $('after while', x);
} else {
  $('oh');
}
$('end', x);
`````


## Settled


`````js filename=intro
if ($) {
  let x /*:number*/ = 1;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(x);
    if ($) {
    } else {
      x = 2;
    }
  }
} else {
  $(`oh`);
  $(`end`, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let x = 1;
  while (true) {
    $(x);
    if (!$) {
      x = 2;
    }
  }
} else {
  $(`oh`);
  $(`end`, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  let a = 1;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( a );
    if ($) {

    }
    else {
      a = 2;
    }
  }
}
else {
  $( "oh" );
  $( "end", 1 );
}
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
