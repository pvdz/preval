# Preval test case

# classes_ref.md

> Builtins cases > Classes ref
>
> Check if builtin toplevel classes are changed into their symbols

## Input

`````js filename=intro
$(Boolean);
$(Number);
$(String);
$(Array);
$(Object);
$(Date);
$(Function);
$(RegExp);
$(Math);
$(JSON);
$(Buffer);
$(Map);
$(Set);
`````


## Settled


`````js filename=intro
$($boolean_constructor);
$($number_constructor);
$($string_constructor);
$($array_constructor);
$($object_constructor);
$($date_constructor);
$($function_constructor);
$($regex_constructor);
$(Math);
$(JSON);
$($buffer_constructor);
$($map_constructor);
$($set_constructor);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($boolean_constructor);
$($number_constructor);
$($string_constructor);
$($array_constructor);
$($object_constructor);
$($date_constructor);
$($function_constructor);
$($regex_constructor);
$(Math);
$(JSON);
$($buffer_constructor);
$($map_constructor);
$($set_constructor);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $boolean_constructor );
$( $number_constructor );
$( $string_constructor );
$( $array_constructor );
$( $object_constructor );
$( $date_constructor );
$( $function_constructor );
$( $regex_constructor );
$( Math );
$( JSON );
$( $buffer_constructor );
$( $map_constructor );
$( $set_constructor );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: '<function>'
 - 4: '<function>'
 - 5: '<function>'
 - 6: '<function>'
 - 7: '<function>'
 - 8: '<function>'
 - 9: {}
 - 10: {}
 - 11: '<function>'
 - 12: '<function>'
 - 13: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
