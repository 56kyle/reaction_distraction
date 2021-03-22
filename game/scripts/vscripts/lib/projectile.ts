
function ToUnitVector(v1: Vector): Vector {
    let magnitude: number = v1.Length();
    return v1 * (1 / magnitude) as Vector;
}
class Projectile {
    id: ProjectileID;

    EffectName?: string
    Ability?: CDOTABaseAbility
    Source?: CDOTA_BaseNPC
    bProvidesVision?: boolean
    iVisionRadius?: number
    iVisionTeamNumber?: DOTATeam_t
    ExtraData?: object

    constructor(id: ProjectileID, options: CreateLinearProjectileOptions | CreateTrackingProjectileOptions) {
        this.id = id;
        this.EffectName = options.EffectName;
        this.Ability = options.Ability;
        this.Source = options.Source;
        this.bProvidesVision = options.bProvidesVision;
        this.iVisionRadius = options.iVisionRadius;
        this.iVisionTeamNumber = options.iVisionTeamNumber;
        this.ExtraData = options.ExtraData;
    }
}

export class LinearProjectile extends Projectile {
    vSpawnOrigin: Vector;
    vAcceleration: Vector;
    fMaxSpeed?: number;
    fDistance?: number;
    fStartRadius?: number;
    fEndRadius?: number;
    fExpireTime?: number;
    iUnitTargetTeam?: DOTA_UNIT_TARGET_TEAM;
    iUnitTargetFlags?: DOTA_UNIT_TARGET_FLAGS;
    iUnitTargetType?: DOTA_UNIT_TARGET_TYPE;
    bIgnoreSource?: boolean;
    bHasFrontalCone?: boolean;
    bDrawsOnMinimap?: boolean;
    bVisibleToEnemies?: boolean;

    constructor(options: CreateLinearProjectileOptions) {
        super(ProjectileManager.CreateLinearProjectile(options), options);
        this.vSpawnOrigin = options.vSpawnOrigin || Vector(0, 0, 0);
        this.vVelocity = options.vVelocity || Vector(0, 0, 0);
        this.vAcceleration = options.vAcceleration || Vector(0, 0, 0);
        this.fMaxSpeed = options.fMaxSpeed;
        this.fDistance = options.fDistance;
        this.fStartRadius = options.fStartRadius;
        this.fEndRadius = options.fEndRadius;
        this.fExpireTime = options.fExpireTime;
        this.iUnitTargetTeam = options.iUnitTargetTeam;
        this.iUnitTargetFlags = options.iUnitTargetFlags;
        this.iUnitTargetType = options.iUnitTargetType;
        this.bIgnoreSource = options.bIgnoreSource;
        this.bHasFrontalCone = options.bHasFrontalCone;
        this.bDrawsOnMinimap = options.bDrawsOnMinimap;
        this.bVisibleToEnemies = options.bVisibleToEnemies;
    }

    get location(): Vector {
        return ProjectileManager.GetLinearProjectileLocation(this.id);
    }

    get vVelocity(): Vector {
        return ProjectileManager.GetLinearProjectileVelocity(this.id);
    }

    set vVelocity(velocity: Vector) {
        let magnitude: number = velocity.Length();
        ProjectileManager.UpdateLinearProjectileDirection(this.id, ToUnitVector(velocity), magnitude)
    }
}


export class TrackingProjectile extends Projectile {
    vSourceLoc?: Vector;
    Target?: CDOTA_BaseNPC;
    iMoveSpeed?: number;
    flExpireTime?: number;
    bDodgeable?: boolean;
    bIsAttack?: boolean;
    bReplaceExisting?: boolean;
    bIgnoreObstructions?: boolean;
    bSuppressTargetCheck?: boolean;
    iSourceAttachment?: DOTAProjectileAttachment_t;
    bDrawsOnMinimap?: boolean;
    bVisibleToEnemies?: boolean;
    constructor(options: CreateTrackingProjectileOptions) {
        super(ProjectileManager.CreateTrackingProjectile(options), options);
        this.vSourceLoc = options.vSourceLoc;
        this.Target = options.Target;
        this.iMoveSpeed = options.iMoveSpeed;
        this.flExpireTime = options.flExpireTime;
        this.bDodgeable = options.bDodgeable;
        this.bIsAttack = options.bIsAttack;
        this.bReplaceExisting = options.bReplaceExisting;
        this.bIgnoreObstructions = options.bIgnoreObstructions;
        this.bSuppressTargetCheck = options.bSuppressTargetCheck;
        this.iSourceAttachment = options.iSourceAttachment;
        this.bDrawsOnMinimap = options.bDrawsOnMinimap;
        this.bVisibleToEnemies = options.bVisibleToEnemies;

    }

    get location(): Vector {
        return ProjectileManager.GetTrackingProjectileLocation(this.id);
    }

    get velocity(): Vector {
        if(this.Target && this.iMoveSpeed) {
            let delta_location: Vector = this.Target.GetLocalOrigin() - this.location as Vector;
            return ToUnitVector(delta_location) * this.iMoveSpeed as Vector;
        }
        return Vector(0, 0, 0);
    }

}








