
import { BaseAbility, registerAbility } from "../../lib/dota_ts_adapter";


@registerAbility()
export class open_combine_projectiles_menu extends BaseAbility {
    isInnate = true;

    OnSpellStart() {
		let caster = this.GetCaster();
		if (caster.IsHero()) {
			let playerID = caster.GetPlayerID();
			let player = PlayerResource.GetPlayer(playerID)!;
			CustomGameEventManager.Send_ServerToPlayer(player, "open_combine_projectiles_menu", {})
		}
	}
}

